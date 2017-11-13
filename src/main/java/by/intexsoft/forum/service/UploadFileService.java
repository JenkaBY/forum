package by.intexsoft.forum.service;

import by.intexsoft.forum.dto.FileLink;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UploadFileService {
    List<FileLink> uploadUserImage(List<MultipartFile> files) throws IOException;
}
