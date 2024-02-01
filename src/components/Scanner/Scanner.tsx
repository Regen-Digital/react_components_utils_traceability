import * as React from 'react';
import { Html5Qrcode, Html5QrcodeResult } from 'html5-qrcode';
import CameraswitchRoundedIcon from '@mui/icons-material/CameraswitchRounded';
import { Box } from '@mui/material';
import { detectDevice } from '../../utils/helpers';
import { IScannerRef } from '../../models';

const { forwardRef, useImperativeHandle } = React;
interface IHtml5QrcodePluginProps {
  fps?: number;
  qrbox?: { width: number; height: number };
  aspectRatio?: number;
  disableFlip?: boolean;
  qrCodeSuccessCallback: (
    decodedText: string,
    result: Html5QrcodeResult
  ) => void;
  qrCodeErrorCallback?: (error: unknown) => void;
}

enum FacingCamera {
  font = 'user',
  back = 'environment',
}

/**
 * Scanner component is used scanner barcode.
 */
const Scanner = forwardRef(
  (props: IHtml5QrcodePluginProps, ref: React.ForwardedRef<IScannerRef>) => {
    const [html5QrcodeScanner, setHtml5QrcodeScanner] =
      React.useState<Html5Qrcode | null>(null);
    const [configEnvCamera, setConfigEnvCamera] = React.useState<string>('');

    /**
     * Define config with props passed and default property.
     */
    const config = {
      fps: props.fps || 10,
      qrbox: props.qrbox || { width: 250, height: 150 },
      disableFlip: props.disableFlip || false,
    };

    /**
     * create method with hook to use in parent with ref.
     */
    useImperativeHandle(ref, () => ({
      async closeQrCodeScanner() {
        await html5QrcodeScanner!.stop();
        await html5QrcodeScanner!.clear();
      },
    }));

    /**
     * get device type with user agent when render app.
     */
    const userAgentString = navigator.userAgent;
    const deviceType = detectDevice(userAgentString);

    React.useEffect(() => {
      //create component scan
      const html5QrcodeScanner = new Html5Qrcode('barcodeReader');
      setHtml5QrcodeScanner(html5QrcodeScanner);

      let facingModeType = FacingCamera.back; // using back camera
      if (deviceType === 'laptop') {
        facingModeType = FacingCamera.font; // using front camera
      }

      setConfigEnvCamera(facingModeType);
      startHtml5QrcodeScanner(html5QrcodeScanner, facingModeType);

      const handleStop = async () => {
        if (html5QrcodeScanner.isScanning) {
          await html5QrcodeScanner.stop();
        }
      };

      return () => {
        handleStop();
      };
    }, []);

    /**
     * handle switch camera.
     */
    const handleSwitchCamera = async () => {
      if (html5QrcodeScanner) {
        await html5QrcodeScanner!.stop();
        await html5QrcodeScanner!.clear();

        let facingModeType = configEnvCamera;
        if (facingModeType === FacingCamera.back) {
          facingModeType = FacingCamera.font;
        } else {
          facingModeType = FacingCamera.back;
        }

        setConfigEnvCamera(facingModeType);
        startHtml5QrcodeScanner(html5QrcodeScanner, facingModeType);
      }
    };

    /**
     * render scanner ui to scan barcode.
     */
    const startHtml5QrcodeScanner = async (
      html5QrcodeScanner: Html5Qrcode,
      facingMode: string
    ) => {
      html5QrcodeScanner.start(
        { facingMode },
        config,
        props.qrCodeSuccessCallback,
        props.qrCodeErrorCallback
      );
    };

    return (
      <Box sx={{ position: 'relative' }}>
        <div id='barcodeReader' style={{ minWidth: '100%' }} />
        {deviceType === 'mobile' && (
          <CameraswitchRoundedIcon
            sx={{
              marginTop: '20px',
              display: 'block',
              fontSize: '2rem',
              position: 'absolute',
              top: '75%',
              color: 'white',
              left: '3%',
            }}
            onClick={handleSwitchCamera}
          />
        )}
      </Box>
    );
  }
);

export default React.memo(Scanner);
