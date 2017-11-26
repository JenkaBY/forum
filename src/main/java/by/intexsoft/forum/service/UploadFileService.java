package by.intexsoft.forum.service;

import by.intexsoft.forum.dto.FileLinkDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UploadFileService {
    List<FileLinkDTO> uploadUserImage(List<MultipartFile> files) throws IOException;
}
