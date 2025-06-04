FROM node:18-bullseye

# Install required packages
RUN apt-get update && apt-get install -y \
  openjdk-17-jdk curl unzip git python3 ruby lib32stdc++6 lib32z1 \
  && apt-get clean

# Set environment variables
ENV ANDROID_SDK_ROOT /opt/android-sdk
ENV PATH $PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools

# Download and setup Android SDK command line tools
RUN mkdir -p $ANDROID_SDK_ROOT/cmdline-tools && \
    curl -o tools.zip https://dl.google.com/android/repository/commandlinetools-linux-10406996_latest.zip && \
    unzip tools.zip && \
    rm tools.zip && \
    mv cmdline-tools $ANDROID_SDK_ROOT/cmdline-tools/latest

# Accept Android licenses and install necessary SDK components
RUN yes | sdkmanager --licenses && \
    sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"

# Set working directory
WORKDIR /app

# Copy the entire app into the container
COPY . .

# Decode the keystore from environment variable (handled by GitHub Actions mount)
RUN echo "$KEYSTORE_BASE64" | base64 -d > android/app/my-release-key.keystore

# Build signed APK
RUN cd android && ./gradlew assembleRelease