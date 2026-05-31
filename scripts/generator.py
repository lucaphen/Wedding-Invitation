"""
To run this code you need to install the following dependencies:
pip install google-genai pillow
"""

import os
import time

from google import genai
from google.genai import types

MODEL = "veo-3.1-fast-generate-preview"

# Starting frame for the image-to-video generation.
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
START_IMAGE_PATH = os.path.join(SCRIPT_DIR, "..", "public", "envelope-back.jpg")

client = genai.Client(
    http_options={"api_version": "v1beta"},
    api_key=os.environ.get("GEMINI_API_KEY"),
)

video_config = types.GenerateVideosConfig(
    # person_generation="dont_allow",  # supported values: "dont_allow" or "allow_adult" or "allow_all"
    aspect_ratio="16:9",  # supported values: "16:9" or "16:10"
    number_of_videos=1,  # supported values: 1 - 4
    duration_seconds=6,  # supported values: 5 - 8
    resolution="720p",  # supported values: "720p" or "1080p" or "4k"
)


def generate():
    start_image = types.Image.from_file(location=START_IMAGE_PATH)

    operation = client.models.generate_videos(
        model=MODEL,
        prompt="""Please use the image attached as a starting point. The video should show the envelope being opened cleanly and a letter lifted out. The letter should be lifted out of the envelope and moved closer to the camera. The video should be 6 seconds long, with a resolution of 720p and an aspect ratio of 16:9. The video should be generated in a way that the envelope and letter look realistic and the motion is smooth. Please ensure that the video does not contain any inappropriate content. Please do not include any hands and when the envelope opens it should be a clean opening without any tearing or damage to the envelope.""",
        image=start_image,
        config=video_config,
    )

    # Waiting for the video(s) to be generated
    while not operation.done:
        print("Video has not been generated yet. Check again in 10 seconds...")
        time.sleep(10)
        operation = client.operations.get(operation)

    result = operation.result
    if not result:
        print("Error occurred while generating video.")
        return

    generated_videos = result.generated_videos
    if not generated_videos:
        print("No videos were generated.")
        return

    print(f"Generated {len(generated_videos)} video(s).")
    for n, generated_video in enumerate(generated_videos):
        print(f"Video has been generated: {generated_video.video.uri}")
        client.files.download(file=generated_video.video)
        generated_video.video.save(f"video_{n}.mp4")  # Saves the video(s)
        print(
            f"Video {generated_video.video.uri} has been downloaded to video_{n}.mp4."
        )


if __name__ == "__main__":
    generate()
