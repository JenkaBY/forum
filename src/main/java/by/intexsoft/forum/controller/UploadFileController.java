package by.intexsoft.forum.controller;

import by.intexsoft.forum.constant.ContentType;
import by.intexsoft.forum.dto.FileLinkDTO;
import by.intexsoft.forum.security.SecurityHelper;
import by.intexsoft.forum.service.UploadFileService;
import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.OK;

/**
 * Describes ability to upload file to server
 */
@RestController
@RequestMapping("/upload")
public class UploadFileController {
    private static Logger LOGGER = (Logger) LoggerFactory.getLogger(UploadFileController.class);
    private UploadFileService uploadFileService;
    private SecurityHelper securityHelper;
    @Autowired
    public UploadFileController(UploadFileService uploadFileService, SecurityHelper securityHelper) {
        this.uploadFileService = uploadFileService;
        this.securityHelper = securityHelper;
    }

    /**
     * Allows to upload image for user avatar
     * @param uploadedFile should be uploaded to the server
     * @return links if file was uploaded then OK with List of {@link FileLinkDTO} object, else BAD_REQUEST
     */
    @PostMapping(path = "/user_image")
    public ResponseEntity<?> uploadUserPhoto(@RequestParam("image") MultipartFile uploadedFile) {
        if (uploadedFile.isEmpty()) {
            return new ResponseEntity(BAD_REQUEST);
        }
        if (!ContentType.IMAGE.contains(uploadedFile.getContentType())) {
            return new ResponseEntity<>(BAD_REQUEST);
        }
        List<FileLinkDTO> links;
        try {
            links = uploadFileService.uploadUserImage(Collections.singletonList(uploadedFile));
        } catch (IOException e) {
            return new ResponseEntity<>(BAD_REQUEST);
        }
        LOGGER.info("User(id = {}) was upload image {} to server", securityHelper.getCurrentUser().getId(), uploadedFile.getOriginalFilename());
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
