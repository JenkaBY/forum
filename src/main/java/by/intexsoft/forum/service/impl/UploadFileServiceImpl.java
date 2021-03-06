package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.dto.FileLinkDTO;
import by.intexsoft.forum.service.UploadFileService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

/**
 * Implementation of the {@link UploadFileService}
 */
@Service
public class UploadFileServiceImpl implements UploadFileService {
    //    TODO create applications.properties file and put constant there
    private final static String PATH_TO_ASSETS = "/webapps/forum/assets/src-img/";
    private final static String ASSETS = "assets";


    /**
     * Uploads file to './assets/src-img/' directory
     *
     * @param files files to be uploaded
     * @return List of {@link FileLinkDTO} objects with links to uploaded files
     * @throws IOException if error was occurred during uploading file
     */
    @Override
    public List<FileLinkDTO> uploadUserImage(List<MultipartFile> files) throws IOException {
        List<FileLinkDTO> links = new LinkedList<>();
        for (MultipartFile file : files) {
            if (file.isEmpty()) {
                continue;
            }
            String curDir = System.getProperty("catalina.base");
            byte[] bytes = file.getBytes();
            String originalFileName = file.getOriginalFilename();
            String unique = getUnique();
            Path path = Paths.get(curDir + PATH_TO_ASSETS + unique + originalFileName);
            Files.write(path, bytes);
            links.add(new FileLinkDTO(resolvePathToFile(path.toString())));
        }
        return links;
    }

    private String resolvePathToFile(String pathToFile) {
        return convertToRelativePath(pathToFile);
    }

    private String convertToRelativePath(String absolutePath) {
        int startIndex = absolutePath.indexOf(ASSETS);
        return "." + absolutePath.substring(startIndex - 1);
    }

    private String getUnique() {
        return "" + (new Date()).getTime();
    }
}