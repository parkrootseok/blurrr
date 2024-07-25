package com.luckvicky.blur.domain.like.model.entity;

import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.member.model.entity.Member;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "likes")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id", columnDefinition = "BINARY(36)")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "board_id", columnDefinition = "BINARY(36)")
    private Board board;

    @Builder
    public Like(Member member, Board board) {
        this.member = member;
        this.board = board;
    }

}
