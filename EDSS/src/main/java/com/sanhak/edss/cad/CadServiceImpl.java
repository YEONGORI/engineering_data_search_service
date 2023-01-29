package com.sanhak.edss.cad;

import com.aspose.cad.internal.C.C;
import com.sanhak.edss.aspose.AsposeUtils;
import com.sanhak.edss.s3.S3Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class CadServiceImpl implements CadService {
    private final CadRepository cadRepository;
    private final S3Utils s3Utils;
    private final AsposeUtils asposeUtils;

    public void saveCadFile(String dir) {
        try {
            String mainCategory[] = dir.split("\"");
            s3Utils.downloadFolder(mainCategory[3]);
            Map<String, String[]> fileInfo = asposeUtils.searchCadFleInDataDir(mainCategory[3]);
            for (Map.Entry<String, String[]> entry: fileInfo.entrySet()) {
                Cad cad = new Cad(mainCategory[3], entry.getValue()[0], entry.getKey(), entry.getValue()[1], entry.getValue()[2]);
                cadRepository.save(cad);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
