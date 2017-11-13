package by.intexsoft.forum.controller;

import by.intexsoft.forum.dto.FileLink;
import by.intexsoft.forum.service.UploadFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/upload")
public class UploadFileController {
    private UploadFileService uploadFileService;

    @Autowired
    public UploadFileController(UploadFileService uploadFileService) {
        this.uploadFileService = uploadFileService;
    }

    @PostMapping(path = "/user_image")
    public ResponseEntity<?> uploadUserPhoto(@RequestParam("image") MultipartFile uploadedfile) {
        if (uploadedfile.isEmpty()) {
            return new ResponseEntity("please select a file!", OK);
        }
        List<FileLink> links;
        try {

            links = uploadFileService.uploadUserImage(Arrays.asList(uploadedfile));

        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(links, OK);
    }

//    @ExceptionHandler(IOException.class)
//    public ResponseEntity<?> handleStorageFileNotFound(IOException exc) {
//        return ResponseEntity.notFound().build();
//    }
}
