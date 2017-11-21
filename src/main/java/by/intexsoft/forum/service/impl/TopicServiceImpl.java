package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.dto.TopicDTO;
import by.intexsoft.forum.entity.Topic;
import by.intexsoft.forum.repository.TopicRepository;
import by.intexsoft.forum.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Implementation of TopicService
 */
@Service
public class TopicServiceImpl extends AbstractEntityServiceImpl<Topic> implements TopicService {

    @Autowired
    public TopicServiceImpl(TopicRepository repository) {
        super(repository);
    }

    /**
     * Find all Topic per page
     *
     * @param pageable parameters of page objects
     * @return Page object with content and page params
     */
    public Page<TopicDTO> findAllDto(Pageable pageable) {
        return repository.findAll(pageable)
                .map(topic -> new TopicDTO(topic));
    }

    /**
     * Find all Topic per page created by user with id
     * @param userId user's id
     * @param pageable parameters of page objects
     * @return Page object with content and page params
     */
    @Override
    public Page<TopicDTO> findAllTopicsDtoByUserId(long userId, Pageable pageable) {
        return ((TopicRepository) repository).findAllTopics(userId, pageable)
                .map(topic -> new TopicDTO(topic));
    }

    /**
     * Find all Topic per page by topic title
     *
     * @param title    of looking for topic
     * @param pageable parameters of page objects
     * @return Page object with content and page params
     */
    @Override
    public Page<TopicDTO> findAllByTopicTitle(String title, Pageable pageable) {
        return ((TopicRepository) repository).findByTitleContainingIgnoreCase(title, pageable)
                .map(topic -> new TopicDTO(topic));
    }
}
