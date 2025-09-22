import ExpoModulesCore
import Argon2Swift

public class ExpoArgon2Module: Module {
    public func definition() -> ModuleDefinition {
        Name("ExpoArgon2")
        Function("hash") {
            (password: String, salt: String, options: [String: Any]) in
            let timeCost = options["timeCost"] as? Int ?? 3
            let memoryCost = options["memoryCost"] as? Int ?? 4096
            let parallelism = options["parallelism"] as? Int ?? 1
            let hashLength = options["hashLength"] as? Int ?? 32
            let typeString = options["type"] as? String ?? "argon2id"
            let type: Argon2Type
            
            switch (typeString) {
            case "argon2d":
                type = .d
            case "argon2i":
                type = .i
            case "argon2id":
                type = .id
            default:
                throw Exception(name: "InvalidMode", description: "Invalid Argon2 mode: \(typeString)")
            }
            
            guard let passwordData = password.data(using: .utf8),
                  let saltData = salt.data(using: .utf8) else {
                throw Exception(name: "EncodingError", description: "Failed to encode password or salt")
            }
            
            let result = try! Argon2Swift.hashPasswordBytes(password: passwordData, salt: Salt.init(bytes: saltData), iterations: timeCost, memory: memoryCost, parallelism: parallelism, length: hashLength, type: type)
            
            return [
                "hex": result.hexString(),
                "raw": result.hashData(),
                "encoded": result.encodedString()
            ]
        }
    }
}
