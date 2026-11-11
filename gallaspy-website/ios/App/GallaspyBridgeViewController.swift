import UIKit
import Capacitor

class GallaspyBridgeViewController: CAPBridgeViewController {

    override open func capacitorDidLoad() {
        super.capacitorDidLoad()

        bridge?.registerPluginInstance(
            GallaspyVideoExportPlugin()
        )
    }
}
