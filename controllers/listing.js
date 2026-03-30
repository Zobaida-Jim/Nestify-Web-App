const Listing = require("../models/listing");

//Index
module.exports.index = async (req, res) => {
    let { category, country } = req.query;

    let filter = {};

    // category filter
    if (category) {
        filter.category = category;
    }

    // country search (case-insensitive)
    if (country) {
        filter.country = { $regex: country, $options: "i" };
    }

    let allListings = await Listing.find(filter);

    res.render("listings/index.ejs", { 
        allListings,
        category,
        country
    });
};

//New
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}

//Create
module.exports.createListing = async(req, res, next) => {
    if (!req.file) { //No one can post listing from link
        throw new ExpressError(400, "Image is required");
    }

    let url = req.file.path;
    let filename = req.file.filename;
    let newListing = new Listing(req.body.listing); //To extract values from object and store it in newListing

    newListing.owner = req.user._id; //Add owner when a new listing is created

    newListing.image = {url, filename}; 

    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

//Show
module.exports.showListing = async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({path: "reviews", 
        populate: {
            path: "author",
        },
    })
    .populate("owner");
    if(!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
}

//Edit
module.exports.renderEditForm = async(req, res) => { //Edit Route
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_200,w_250");

    res.render("listings/edit.ejs", { listing, originalImageUrl });
}

//Update
module.exports.updateListing = async(req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }

    req.flash("update", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}

//Delete
module.exports.destroyListing = async(req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("deleted", "Listing Deleted!");
    res.redirect("/listings");
}