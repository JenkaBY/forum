package by.intexsoft.forum.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class HomeController {
	
	@RequestMapping(path="/")
	public ResponseEntity<?> hello() {
		return new ResponseEntity<String>("Hello", HttpStatus.OK) ;
	}
	
	@RequestMapping(path="/hello")
	public String hello1() {
		return "Hello from hello1";
	}
}
