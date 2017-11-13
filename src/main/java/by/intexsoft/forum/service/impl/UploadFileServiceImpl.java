package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.dto.FileLink;
import by.intexsoft.forum.service.UploadFileService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.LinkedList;
import java.util.List;

@Service
public class UploadFileServiceImpl implements UploadFileService {
    private final static String USERS_FOLDER = "/assets/user_folder/";

    @Override
    public List<FileLink> uploadUserImage(List<MultipartFile> files) throws IOException {
        List<FileLink> links = new LinkedList<>();
        for (MultipartFile file : files) {

            if (file.isEmpty()) {
                continue; //next pls
            }
            String curDir = System.getProperty("catalina.base");
            System.out.println("catalina.base " + System.getProperty("catalina.base"));
            System.out.println("user.dir " + System.getProperty("user.dir"));
            System.out.println("info.properties " + System.getProperty("info.properties"));
            byte[] bytes = file.getBytes();
            Path path = Paths.get(curDir + file.getOriginalFilename());
            Files.write(path, bytes);
            links.add(new FileLink(path.toString()));
        }
        return links;
    }
}
