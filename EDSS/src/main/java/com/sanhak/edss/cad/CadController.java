package com.sanhak.edss.cad;

import com.sanhak.edss.s3.S3Utils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cad")
public class CadController {
    private final CadServiceImpl cadService;
    private final S3Utils s3Utils;

    @GetMapping("/data")
    public ResponseEntity<List<Cad>> getCadDatas(@RequestParam String searchText) {
        try {
            if (searchText == null)
                System.out.println("검색어 입력 필요");
            List<Cad> result = cadService.searchCadFile(searchText);
            if (result.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/data")
    public ResponseEntity<HttpStatus> createCadDatas(@RequestBody String s3Url) {
        try {
            System.out.println("Cad Controll");
            cadService.saveCadFile(s3Url);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            System.out.println("save Error");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/delete")
    public ResponseEntity<HttpStatus> deleteData(@RequestParam List<String> DelList){
        try{
            cadService.deleteFile(DelList);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Exception e){
            System.out.println("Delete error");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/modify")//단일 파일 수정하는 경우, 디렉터리 전체 수정하는 경우 나눠야 함.
    public ResponseEntity<HttpStatus> modifyData(@RequestParam String s3Url){
        try{
            cadService.modifyFile(s3Url);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Exception e){
            System.out.println("Modify error");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/store/**")
    public ResponseEntity<List<String>> viewPath(HttpServletRequest request){
        List<String> result;
        try{
            String tmp = URLDecoder.decode(request.getRequestURI(),"UTF-8");
            String[] split = tmp.split("/cad/store");
            String prefix = split.length < 2 ? "" : split[1].substring(1);
            result = cadService.ViewStructure(s3Utils.bucket, prefix);
            return new ResponseEntity<>(result,HttpStatus.OK);
        }catch(Exception e){
            System.out.println("viewPath error");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


}
