package com.sanhak.edss.member;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name="member")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Member {
    @JsonIgnore
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "employNumber", length = 50, unique = true)
    private String employNumber;

    @JsonIgnore
    @Column(name = "password", length = 100)
    private String password;

    @Column(name = "userName", length = 50)
    private String userName;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "phoneNumber", length = 20)
    private int phoneNumber;

    @Column(name = "birthday", length = 10)
    private int birthday;

    @Column(name = "adminKey")
    private String adminKey;

    @ManyToMany
    @JoinTable(
            name = "user_authority",
            joinColumns = {@JoinColumn(name = "id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")})
            private Set<Authority> authorities;

    Member(String employNumber, String password, String userName, String email, int phoneNumber, int birthday, String adminKey) {
        this.employNumber = employNumber;
        this.password = password;
        this.userName = userName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.birthday = birthday;
        this.adminKey = adminKey;
    }
}
