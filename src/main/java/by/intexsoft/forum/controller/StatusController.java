package by.intexsoft.forum.controller;

import by.intexsoft.forum.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.ResponseEntity.ok;

/**
 * Controller for manage statuses.
 */
@RestController
@RequestMapping("/statuses")
public class StatusController {
    private StatusService statusService;

    @Autowired
    public StatusController(StatusService statusService) {
        this.statusService = statusService;
    }

    /**
     * Get all statuses
     *
     * @return response with list of existing roles.
     */
    @GetMapping
    public ResponseEntity<?> getStatuses() {
        return ok(statusService.findAll());
    }
}
