package by.intexsoft.forum.controller;

import by.intexsoft.forum.constant.ContentType;
import by.intexsoft.forum.dto.FileLink;
import by.intexsoft.forum.service.UploadFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.OK;

/**
 * Describes ability to upload file to server
 */
@RestController
@RequestMapping("/upload")
public class UploadFileController {
    private UploadFileService uploadFileService;

    @Autowired
    public UploadFileController(UploadFileService uploadFileService) {
        this.uploadFileService = uploadFileService;
    }

    /**
     * Allows to upload image for user avatar
     * @param uploadedFile should be uploaded to the server
     * @return links if file was uploaded then OK with List of {@link FileLink} object, else BAD_REQUEST
     */
    @PostMapping(path = "/user_image")
    public ResponseEntity<?> uploadUserPhoto(@RequestParam("image") MultipartFile uploadedFile) {
        if (uploadedFile.isEmpty()) {
            return new ResponseEntity(BAD_REQUEST);
        }
        if (!ContentType.IMAGE.contains(uploadedFile.getContentType())) {
            return new ResponseEntity<>(BAD_REQUEST);
        }
        List<FileLink> links;
        try {
            links = uploadFileService.uploadUserImage(Arrays.asList(uploadedFile));
        } catch (IOException e) {
            return new ResponseEntity<>(BAD_REQUEST);
        }
        return new ResponseEntity<>(links, OK);
    }

    /**
     * Handle exception when temp location is not found
     * @param exc exception to be handle
     * @return ResponseEntity with 404 status code
     */
    @ExceptionHandler(IOException.class)
    public ResponseEntity<?> handleStorageFileNotFound(IOException exc) {
        return ResponseEntity.notFound().build();
    }
}
