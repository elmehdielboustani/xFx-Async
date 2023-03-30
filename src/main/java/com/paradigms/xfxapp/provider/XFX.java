package com.paradigms.xfxapp.provider;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import org.springframework.core.io.FileSystemResource;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/xfx")
public class XFX {

    private static final String ROOT = "SharedFolder/";

    public Map<String, Long> browse(String path) {
        File folder = new File(path);
        File[] listOfFiles = folder.listFiles();
        Map<String, Long> files = new TreeMap<>();

        for (File file : listOfFiles) {
            if (file.isFile()) {
                files.put(file.getName(), file.length());
            } else if (file.isDirectory()) {
                files.putAll(browse(new File(path, file.getName()).getPath()));
            }
        }
        return files;

    }

    @GetMapping(path="/getfiles", produces = "application/json")
    public ResponseEntity<String> browseFiles(@RequestParam("path") String path) {
        if (path == null || path.isEmpty())
            path = ROOT; // default path
        else if (!path.startsWith("SharedFolder/")) // input validation
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Path is not valid (ROOT FOLDER: " + ROOT + ").");

        Map<String, Long> files = browse(path);
        if (files.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No files to list.");
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(files.toString());
    }

    @PatchMapping(path = "/rename")
    public ResponseEntity<String> renameFile(@RequestParam("path") String oldFilePath,
            @RequestParam("name") String newFileName) {

        if (!oldFilePath.startsWith(ROOT)) // input validation
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("File path is not valid (It should start with " + ROOT + ").");

        if (newFileName == null || newFileName.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("New file name is empty.");
        }

        File oldFile = new File(oldFilePath);

        // checking if folder
        if (oldFile.isDirectory()) {
            if (oldFile.renameTo(new File(oldFile.getParent() + "/" + newFileName))) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body("Folder renamed successfully to: " + newFileName);
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to rename folder.");
        }

        if (!oldFile.exists()) { // file not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("File not found: " + oldFilePath);
        }

        File newFile = new File(oldFile.getParent() + "/" + newFileName); // updating new file path
        // renaming the file
        if (oldFile.renameTo(newFile)) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body("File renamed successfully to: " + newFile.getName());
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Failed to rename file.");

    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteFile(@RequestParam("path") String filePath) {

        if (!filePath.startsWith(ROOT)) // input validation
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("File path is not valid. (It should start with " + ROOT + ").");

        File file = new File(filePath);

        if (!file.exists()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("File was not found: " + filePath);
        }

        if (file.delete()) { // deleting the file
            return ResponseEntity.status(HttpStatus.OK)
                    .body("File: " + file.getName() + " was successfully deleted.");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Failed to delete file.");
    }

    @GetMapping("/download")
    public ResponseEntity<FileSystemResource> downloadFile(@RequestParam("path") String filePath) {

        try {

            if (!filePath.startsWith(ROOT)) // input validation
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(null);

            File file = new File(filePath);

            if (!file.exists()) // file not found
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(null);

            FileSystemResource resource = new FileSystemResource(file);
            return ResponseEntity.ok()
                    .header("Content-Disposition", "attachment; filename=" + file.getName())
                    .body(resource);

        } catch (Exception ex) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(path = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<String> uploadFile(@RequestParam("path") String filePath,
            @RequestParam("file") MultipartFile file) {
        try {
            if (!filePath.startsWith(ROOT))
                return new ResponseEntity<>("File path is not valid. (It should start with " + ROOT + ").",
                        HttpStatus.BAD_REQUEST);

            Path path = Paths.get(filePath);
            // check if directory exists, otherwise create it
            if (!Files.exists(path))
                Files.createDirectories(path);
            File newFile = new File(filePath + file.getOriginalFilename());

            if (newFile.exists())
                return new ResponseEntity<>("File already exists.", HttpStatus.CONFLICT);
            newFile.createNewFile();
            FileOutputStream fileOut = new FileOutputStream(newFile);
            fileOut.write(file.getBytes());
            fileOut.close();
            return new ResponseEntity<>("File uploaded successfully under: " + newFile.getAbsolutePath(),
                    HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>("File upload failed.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
