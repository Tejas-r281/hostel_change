// const PDFDocument = require("pdfkit");
// const fs = require("fs");

// // Create a document
// const makepdf=async(options)=>
// {
// const doc = new PDFDocument();

// // Pipe its output somewhere, like to a file or HTTP response
// // See below for browser usage
// const data =
// {
//     name: options.name,
//     Alloted: options.hostel,
//     Expected: options.nexthostel?options.nexthostel:"not applicable",

//     year: options.year,
//     branch: options.branch,
//     email: options.email,

// }
// // doc.pipe(fs.createWriteStream("hostel.pdf"));

// doc.fillColor("red").fontSize(25).text("Hostel Change Form", 100, 100);


//     doc.fontSize(15).fillColor("green").text("Name: "+data.name, 100, 150);
//     doc.fontSize(15).text("Alloted Hostel: "+data.Alloted, 100, 180);
//     doc.fontSize(15).text("Expected Hostel: "+data.Expected, 100, 210);
//     doc.fontSize(15).text("Year: "+data.year, 100, 240);
//     doc.fontSize(15).text("Branch: "+data.branch, 100, 270);
//     doc.fontSize(15).text("Email: "+data.email, 100, 300);




// // doc.fillColor("blue")
// //   .text("Here is a link!", 100, 100)
// //   .underline(100, 100, 160, 27, { color: "#0000FF" })
// //   .link(100, 100, 160, 27, "http://google.com/");
// doc.end();

// }

// module.exports=makepdf;