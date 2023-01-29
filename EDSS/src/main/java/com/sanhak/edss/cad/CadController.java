package com.sanhak.edss.cad;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cad")
public class CadController {
    private final CadServiceImpl cadService;

    @GetMapping("/data")
    public ResponseEntity<List<Cad>> getCadDatas(@RequestParam String searchText) {
        try {
            if (searchText == null)
                System.out.println("검색어 입력 필요");
            List<Cad> cads = new ArrayList<>();
            // 여기서 엘라스틱 서치로 받아와야함
//            if (cads.isEmpty())
//                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/data")
    public ResponseEntity<HttpStatus> createCadDatas(@RequestBody String s3Url) {
        cadService.saveCadFile(s3Url);
        return new ResponseEntity<>(HttpStatus.OK);
//        try {
//        } catch (Exception e) {
//            System.out.println("ERROR");
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
    }
}
