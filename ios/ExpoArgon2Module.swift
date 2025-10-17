import ExpoModulesCore
import Argon2Swift

public class ExpoArgon2Module: Module {
    public func definition() -> ModuleDefinition {
        Name("ExpoArgon2")
        Function("hash") {
            (password: Data, salt: Data, options: [String: Any]) in
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
            
            let result = try! Argon2Swift.hashPasswordBytes(password: password, salt: Salt.init(bytes: salt), iterations: timeCost, memory: memoryCost, parallelism: parallelism, length: hashLength, type: type)
            
            return [
                "hex": result.hexString(),
                "raw": result.hashData(),
                // i'm not sure why, but the encoded string has trailing null characters that need to be trimmed
                "encoded": result.encodedString().trimmingCharacters(in: CharacterSet(charactersIn: "\0"))
            ]
        }
    }
}
