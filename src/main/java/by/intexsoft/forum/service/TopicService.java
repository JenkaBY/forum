package by.intexsoft.forum.service;

import by.intexsoft.forum.dto.TopicDTO;
import by.intexsoft.forum.entity.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TopicService extends AbstractEntityService<Topic> {

    Page<TopicDTO> findAllDto(Pageable pageable);

    Page<TopicDTO> findAllTopicsDtoByUserId(long userId, Pageable pageable);

    Page<TopicDTO> findAllByTopicTitle(String title, Pageable pageable);
}