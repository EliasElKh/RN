FROM node:18-bullseye

# Install required packages
RUN apt-get update && apt-get install -y \
  openjdk-17-jdk curl unzip git python3 ruby lib32stdc++6 lib32z1 \
  && apt-get clean

# Set environment variables
ENV ANDROID_SDK_ROOT=/opt/android-sdk
ENV PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools

# Download and setup Android SDK command line tools
RUN mkdir -p $ANDROID_SDK_ROOT/cmdline-tools && \
    curl -o tools.zip https://dl.google.com/android/repository/commandlinetools-linux-10406996_latest.zip && \
    unzip tools.zip && \
    rm tools.zip && \
    mv cmdline-tools $ANDROID_SDK_ROOT/cmdline-tools/latest

# Accept licenses and install build tools
RUN yes | sdkmanager --licenses && \
    sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"

# Optional: Cache Gradle in Docker (improves speed)
ENV GRADLE_USER_HOME=/gradle-cache


ENV GRADLE_OPTS=-Dorg.gradle.jvmargs=-Xmx4g

WORKDIR /app
COPY . .

# Install node modules
RUN npm install

# Make gradlew executable
RUN chmod +x android/gradlew

# ✅ Build debug APK
RUN cd android && ./gradlew assembleDebug

# Copy the built debug APK to /output so we can extract it later
RUN mkdir -p /output && cp android/app/build/outputs/apk/debug/app-debug.apk /output/
