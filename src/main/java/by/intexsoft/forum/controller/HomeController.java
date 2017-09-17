package by.intexsoft.forum.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/")
public class HomeController {

    @RequestMapping(path = "/")
    public ResponseEntity<?> hello() {
        return new ResponseEntity<>("Hello", OK);
    }

    @RequestMapping(path = "/hello")
    public ResponseEntity<?> hello1() {
        return new ResponseEntity<>("Hello from hello1() method", OK);
    }
}
