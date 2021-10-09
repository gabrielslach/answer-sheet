<template>
  <input id="fileUpload" type="file" @change="readFile" hidden>
  <q-btn round flat style="color: white;" icon="cloud_upload" @click="triggerFileUpload()" />
</template>

<script>
import XLSX from 'xlsx';
import { mapActions } from 'vuex';

export default {

    name: 'ExcelUploader',

    methods: {
        ...mapActions(['addCardsFromSheet']),
        triggerFileUpload() {
        document.getElementById('fileUpload').click();
        },
        readFile(e) {
            const files = e.target.files;

            if (!files.length) {
                return ;
            } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
                return alert("The upload format is incorrect. Please upload xls or xlsx format");
            }
            
            const fileReader = new FileReader();
            fileReader.onload = e => {
                try {
                    const data = e.target.result;
                    const workbook = XLSX.read(data, {
                        type: "binary"
                    });
                    const sheetName = workbook.SheetNames[0];
                    const sheetObj = workbook.Sheets[sheetName];
                    const sheetJSON = XLSX.utils.sheet_to_json(sheetObj);
                    
                    this.addCardsFromSheet(sheetJSON);
                } catch (e) {
                    console.log(e)
                    return alert("Read failure!");
                }
            };
            fileReader.readAsBinaryString(files[0]);
        }
    }
}
</script>

<style>

</style>