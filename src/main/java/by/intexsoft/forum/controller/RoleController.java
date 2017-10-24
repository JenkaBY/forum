package by.intexsoft.forum.controller;

import by.intexsoft.forum.service.RoleService;
import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.ResponseEntity.ok;

/**
 * Contoller for manage roles.
 */
@RestController
@RequestMapping(path = "/role")
public class RoleController {
    private static Logger LOGGER = (Logger) LoggerFactory.getLogger(RoleController.class);
    private RoleService roleService;

    @Autowired
    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    /**
     * Get all roles from DB
     *
     * @return response with list of existing roles.
     */
    @GetMapping(path = "/all")
    public ResponseEntity<?> getRoles() {
        return ok(roleService.findAll());
    }
}
