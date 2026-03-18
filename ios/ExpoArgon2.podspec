require 'json'

package = JSON.parse(File.read(File.join(__dir__, '..', 'package.json')))

Pod::Spec.new do |s|
  s.name           = 'ExpoArgon2'
  s.version        = package['version']
  s.summary        = package['description']
  s.description    = package['description']
  s.license        = package['license']
  s.author         = package['author']
  s.homepage       = package['homepage']
  s.platforms      = {
    :ios => '15.1',
    :tvos => '15.1'
  }
  s.swift_version  = '5.9'
  s.source         = { git: 'https://github.com/shinobu-uwu/expo-argon2' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'
  s.dependency 'Argon2Swift'

  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
    'SWIFT_INCLUDE_PATHS' => '$(inherited) $(PODS_CONFIGURATION_BUILD_DIR)/Argon2Swift',
    'OTHER_SWIFT_FLAGS' => '$(inherited) -D EXPO_MODULES_CORE'
  }
  
  # Ensure the C headers are accessible if Argon2Swift doesn't export them correctly
  s.user_target_xcconfig = { 
    'HEADER_SEARCH_PATHS' => '$(inherited) $(PODS_ROOT)/Argon2Swift' 
  }

  s.source_files = "**/*.{h,m,mm,swift,hpp,cpp}"
end
