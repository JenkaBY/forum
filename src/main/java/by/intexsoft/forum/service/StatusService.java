package by.intexsoft.forum.service;

import by.intexsoft.forum.entity.Status;

public interface StatusService extends AbstractSystemEntityService<Status> {
    Status findByTitle(String title);
}