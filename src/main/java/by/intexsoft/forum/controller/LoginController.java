package by.intexsoft.forum.controller;

import by.intexsoft.forum.entity.User;
import by.intexsoft.forum.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping(path = "/")
public class LoginController {
    private UserService userService;

    @Autowired
    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(path = "/new_account")
    public ResponseEntity<?> createNewAccount(@RequestBody User user) {
        if (userService.isEmailExist(user.email) || userService.isNameExist(user.name)) {
            return new ResponseEntity<>("Email or name exists in DB.", BAD_REQUEST);
        }
        user.email = user.email.toLowerCase();
        return new ResponseEntity<>(userService.save(user), CREATED);
    }
}