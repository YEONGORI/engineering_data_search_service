package com.sanhak.edss.member;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/member")
public class MemberController {
    private final MemberServiceImpl memberService;

    @GetMapping("/info")
    public ResponseEntity<Member> findMemberInfoByEmployNumber(@AuthenticationPrincipal Member member) {
        return ResponseEntity.ok(memberService.findMemberInfoByEmployNumber(member.getEmployNumber()));
    }

    @PostMapping("/register")
    public ResponseEntity<Member> registerMember(@RequestBody Member member) {
        try {
            Member _member = memberService.regiserMember(member);
            return new ResponseEntity<>(_member, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
