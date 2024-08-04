package com.luckvicky.blur.domain.channel.service;

import com.luckvicky.blur.domain.channel.model.dto.ChannelDto;
import com.luckvicky.blur.domain.channel.model.dto.request.ChannelCreateRequest;
import java.util.List;
import java.util.UUID;

public interface ChannelService {
    ChannelDto createChannel(ChannelCreateRequest request, UUID memberId);
    List<ChannelDto> getAllChannels(UUID memberId);
    List<ChannelDto> getFollowedChannels(UUID memberId);
    List<ChannelDto> getCreatedChannels(UUID memberId);
    List<ChannelDto> searchChannelsByKeyword(String keyword);
    ChannelDto getChannelById(UUID channelId, UUID memberId);
    Boolean createFollow(UUID memberId, UUID channelId);
    Boolean deleteFollow(UUID memberId, UUID channelId);
}
