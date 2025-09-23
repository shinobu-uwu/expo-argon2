package expo.modules.argon2

import com.lambdapioneer.argon2kt.Argon2Exception
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.typedarray.Uint8Array
import com.lambdapioneer.argon2kt.Argon2Kt
import com.lambdapioneer.argon2kt.Argon2Mode

class ExpoArgon2Module : Module() {
    override fun definition() = ModuleDefinition {
        Name("ExpoArgon2")

        Function("hash") { password: ByteArray, salt: ByteArray, options: Map<String, Any> ->
            val argon2 = Argon2Kt()
            val timeCost = (options["timeCost"] as? Number)?.toInt() ?: 3
            val memoryCost = (options["memoryCost"] as? Number)?.toInt() ?: 4096
            val parallelism = (options["parallelism"] as? Number)?.toInt() ?: 1
            val hashLength = (options["hashLength"] as? Number)?.toInt() ?: 32
            val modeString = (options["type"] as? String) ?: "argon2id"
            val mode = when (modeString) {
                "argon2d" -> Argon2Mode.ARGON2_D
                "argon2i" -> Argon2Mode.ARGON2_I
                "argon2id" -> Argon2Mode.ARGON2_ID
                else -> throw Argon2Exception("Invalid mode")
            }
            val result = argon2.hash(
                mode = mode,
                password = password,
                salt = salt,
                tCostInIterations = timeCost,
                mCostInKibibyte = memoryCost,
                parallelism = parallelism,
                hashLengthInBytes = hashLength
            )
            val rawHash = result.rawHashAsByteArray()
            val hexString = result.rawHashAsHexadecimal()
            val encodedString = result.encodedOutputAsString()

            return@Function mapOf(
                "raw" to rawHash,
                "encoded" to encodedString,
                "hex" to hexString
            )
        }
    }
}
