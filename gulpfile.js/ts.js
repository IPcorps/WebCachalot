
// A few "require"
const gulp = require("gulp"),
    gulpTypescript = require("gulp-typescript"),
    gulpTerser = require("gulp-terser"),
    gulpRename = require("gulp-rename"),
    gulpIf = require("gulp-if"),
    gulpDel = require("gulp-del-lines");

// Preparation for acceleration
const tsProject_C = gulpTypescript.createProject("./tsconfig.json", { module: "ESNext" }),
    tsProject_S = gulpTypescript.createProject("./tsconfig.json");

exports.change = (path, client) => {

    // To see something happen
    console.log("\x1B[90m%s \x1b[36m%s\x1b[0m", new Date().toLocaleTimeString(), path, `start of processing ${client ? "ES" : "UMD"} ...`);

    // TypeScript processing for require
    const tsRes = gulp.src(path)                                                                // Reading the file 
        .pipe(client ? tsProject_C() : tsProject_S())                                           // TypeScript -> JavaScript
        .on("error", console.log);                                                              // For oops caught a mistake 🙀

    tsRes.js
        .pipe(gulpDel())                                                                        // Deleting the specified line during compilation
        // .pipe(gulp.dest("."))                                                                // Saving an intermediate file
        .pipe(gulpTerser())                                                                     // Javascript minifier and ... what else you want
        // .pipe(gulpRename({ extname: ".m.js" }))                                              // Output file extension
        .pipe(gulpRename(dir => dir.dirname = dir.dirname.replace("src\\", "app\\")))           // Setting the output path
        .pipe(gulp.dest("."))                                                                   // Saving the file
        .on("end", () => console.log("\x1B[90m%s \x1b[36m%s\x1b[0m", new Date().toLocaleTimeString(), path, "ts processing is complete!"));

    // tsRes.dts.pipe(gulp.dest("."))                                                           // Saving the declaration file
    //     .on("end", () => console.log("\x1B[90m%s \x1b[36m%s\x1b[0m", new Date().toLocaleTimeString(), path, "d.ts processing is complete!"));

}
