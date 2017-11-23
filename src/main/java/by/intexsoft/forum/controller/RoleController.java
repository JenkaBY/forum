package by.intexsoft.forum.controller;

import by.intexsoft.forum.constant.RoleConst;
import by.intexsoft.forum.service.RoleService;
import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static java.util.stream.Collectors.toSet;
import static org.springframework.http.ResponseEntity.ok;

/**
 * Controller for manage roles.
 */
@RestController
@RequestMapping("/role")
public class RoleController {
    private static Logger LOGGER = (Logger) LoggerFactory.getLogger(RoleController.class);
    private RoleService roleService;

    @Autowired
    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    /**
     * Get all roles except 'SYSTEM' role
     * @return response with list of existing roles.
     */
    @GetMapping("/all")
    public ResponseEntity<?> getRoles() {
        return ok(roleService.findAll()
                .stream()
                .filter(role -> !role.title.equalsIgnoreCase(RoleConst.SYSTEM))
                .collect(toSet())
        );
    }
}
