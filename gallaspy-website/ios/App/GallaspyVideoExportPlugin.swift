import Foundation
import Capacitor

@objc(GallaspyVideoExportPlugin)
public class GallaspyVideoExportPlugin: CAPPlugin, CAPBridgedPlugin {

    public let identifier = "GallaspyVideoExportPlugin"
    public let jsName = "GallaspyVideoExport"

    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(
            name: "checkAvailability",
            returnType: CAPPluginReturnPromise
        )
    ]

    @objc func checkAvailability(_ call: CAPPluginCall) {
        call.resolve([
            "available": true,
            "platform": "ios",
            "rendererReady": false,
            "version": "1.0.0"
        ])
    }
}
