import { Component } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  availableDevices!: MediaDeviceInfo[];
  deviceCurrent!: MediaDeviceInfo;
  deviceSelected!: string;


  title = 'barcode';



  torchEnabled = false;
  allowedFormats = [

    BarcodeFormat.AZTEC,
    /** CODABAR 1D format. */
    BarcodeFormat.CODABAR,
    /** Code 39 1D format. */
    BarcodeFormat.CODE_39,
    /** Code 93 1D format. */
    BarcodeFormat.CODE_93,
    /** Code 128 1D format. */
    BarcodeFormat.CODE_128,
    /** Data Matrix 2D barcode format. */
    BarcodeFormat.DATA_MATRIX,
    /** EAN-8 1D format. */
    BarcodeFormat.EAN_8,
    /** EAN-13 1D format. */
    BarcodeFormat.EAN_13,
    /** ITF (Interleaved Two of Five) 1D format. */
    BarcodeFormat.ITF,
    /** MaxiCode 2D barcode format. */
    BarcodeFormat.MAXICODE,
    /** PDF417 format. */
    BarcodeFormat.PDF_417,
    /** QR Code 2D barcode format. */
    BarcodeFormat.QR_CODE,
    /** RSS 14 */
    BarcodeFormat.RSS_14,
    /** RSS EXPANDED */
    BarcodeFormat.RSS_EXPANDED,
    /** UPC-A 1D format. */
    BarcodeFormat.UPC_A,
    /** UPC-E 1D format. */
    BarcodeFormat.UPC_E,
    /** UPC/EAN extension format. Not a stand-alone format. */
    BarcodeFormat.UPC_EAN_EXTENSION

  ];

  hasDevices!: boolean;
  hasPermission!: boolean;

  qrResultString: string = '';

  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  // constructor(private readonly _dialog: MatDialog) { }

  // clearResult(): void {
  //   this.qrResultString = '';
  // }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }

  onDeviceSelectChange(selected: string) {
    const selectedStr = selected || '';
    if (this.deviceSelected === selectedStr) { return; }
    this.deviceSelected = selectedStr;
    const device = this.availableDevices.find(x => x.deviceId === selected);
    // this.deviceCurrent = device || undefined;
  }

  onDeviceChange(device: MediaDeviceInfo) {
    const selectedStr = device?.deviceId || '';
    if (this.deviceSelected === selectedStr) { return; }
    this.deviceSelected = selectedStr;
    this.deviceCurrent = device || undefined;
  }
  barcode = ''
  openFormatsDialog() {
    const data = {
      formatsEnabled: this.allowedFormats,
    };

    // this._dialog
    //   .open(FormatsDialogComponent, { data })
    //   .afterClosed()
    //   .subscribe(x => {
    //     if (x) {
    //       this.allowedFormats = x;
    //     } 
    //   });
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  openInfoDialog() {
    const data = {
      hasDevices: this.hasDevices,
      hasPermission: this.hasPermission,
    };

    // this._dialog.open(AppInfoDialogComponent, { data });
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }


}
