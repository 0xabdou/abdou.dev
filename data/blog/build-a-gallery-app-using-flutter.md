---
title: "Build a gallery app using Flutter"
summary: "How to build a gallery app using Flutter, to display all the photos and videos on your phone."
tags: [flutter, dart]
publishedAt: '2020-11-01'
banner: "/static/images/build-a-gallery-app-using-flutter/banner.png"
---

At some point, we all needed to access photos in the phone's storage, either to upload it to a backend, or just to display it in a Widget. Either way, the only choice we had was to use the famous [image_picker][image_picker] plugin or some other plugin that uses the same approach.

# Not too bad
These plugins are awesome and are enough for many use-cases, But sometimes we want more than just selecting a few photos using an external app. What if we wanted to build that external app itself? Or even less enthusiastic, what if we simply wanted to show a ListView with all the images in the phone's storage?

# I got you
This would've been quite hard to achieve if not for this awesome [photo_manager][photo_manager] plugin. All you need to do is call two functions, and you'll get every album and every photo and video on your phone. Let's take a look at some code snippets:
``` dart
final albums = await PhotoManager.getAssetPathList();
```
`albums` will now hold a list of every album in the storage. An album is represented by the `AssetPathEntity` class, let's take a look at the info it holds:
``` dart
class AssetPathEntity {
  ...
  
  // The albums' ID
  String id;
  // The albums name
  String name;
  // How many assets the album holds
  int assetCount;
  // The album's type
  int albumType;
  
  ...
}
```
But that's not all, the album class has two very nice methods, that return the photos and videos (assets) it holds.

If you want to get a range of assets use this:
``` dart
final albumAssets = await album.getAssetListRange(
    start: startIndex,
    end: endIndex,
);
```

If you wanna use pagination, use this instead:
``` dart
final albumAssets = await album.getAssetListPaged(
    page,
    assetPerPage,
);
```
Both these methods return a list of `AssetEntity` objects, which represents a single photo/video (or other). Again, let's highlight some of the main properties of `AssetEntity`:
``` dart
...
// Get the asset's thumbnail bytes
Future<Uint8List> get thumbData;
// Get the asset bytes
Future<Uint8List> get originBytes;
// Get the asset file
Future<File> get file;
// If the asset is a video, get its duration
int duration;
// The width of the asset
int width;
// The height of the asset
int height;
...
```
In short, we have everything we need to display and pick photos/videos, without quitting our lovely Flutter application.

# Let's start building
Okay, now that we finished exploring the main functionality of the plugin, let's put all that knowledge to use. Here's what the final product will look like:

![final_product][final_product]

### 1- Cloning the base project and installing the plugin
First, start by cloning the base project from the link below. Or if you want, you can apply everything directly to one of your own projects.
```URL
https://github.com/aouahib/photo_manager_demo_base
```
Now let's install the [photo_manager][photo_manager] plugin, go to your `pubspec.yaml` file and add the dependency:
``` yaml
dependencies:
  photo_manager: ^0.5.8
```
#### iOS config
Add these lines to your `Info.plist` file:
``` xml
<key>NSPhotoLibraryUsageDescription</key>
<string>The app needs to access your photo library</string>
```
#### Android config
You don't need to do any platform-specific configuration.


By now, you should be good to go, make sure the app runs on your device (don't forget to `flutter pub get` though).

### 2- Requesting permission
The base project is very simple, the first screen contains a button, clicking on it navigates us to another screen where we are going to display the photos/videos. For simplicity, everything is located in a single file: `lib/main.dart`

First, we need to ask the user for permission to access the external storage. Let's make sure we have that permission before navigating to the second page. Go to the `MyApp` class and modify the code as follows:
``` dart
// import the library
import 'package:photo_manager/photo_manager.dart';

...

return RaisedButton(
  // make the function async
  onPressed: () async {
    // ### Add the next 2 lines ###
    final permitted = await PhotoManager.requestPermission();
    if (!permitted) return;
    // ######
    Navigator.of(context).push(
      MaterialPageRoute(builder: (_) => Gallery()),
    );
  },
  child: Text('Open Gallery'),
);
```
This simply requests permission, and if it's not granted, we don't navigate to the next screen. Run the app and make sure it works.
`NOTE: After installing new plugins, quit the app completely and re-run it from cold, otherwise, you will get errors`

### 3- Fetching photos and videos
Now the fun part begins. Head to the `Gallery` class. As you see, it's a `StatefulWidget` with no state so far. Let's start by declaring some state variables:
``` dart
class _GalleryState extends State<Gallery> {
  // This will hold all the assets we fetched
  List<AssetEntity> assets = [];
  ...
}
```
Next, let's write a function that fetches the assets, and updates the state. Add the following code somewhere inside the `_GalleryState` class, I explain everything in the comments:
``` dart
_fetchAssets() async {
  // Set onlyAll to true, to fetch only the 'Recent' album
  // which contains all the photos/videos in the storage
  final albums = await PhotoManager.getAssetPathList(onlyAll: true);
  final recentAlbum = albums.first;

  // Now that we got the album, fetch all the assets it contains
  final recentAssets = await recentAlbum.getAssetListRange(
    start: 0, // start at index 0
    end: 1000000, // end at a very big index (to get all the assets)
  );
    
  // Update the state and notify UI
  setState(() => assets = recentAssets);
}
```

`NOTE: If the phone has too many photos/videos, the function above will take too much time to execute. So for better practice, you should implement some kind of pagination using getAssetListPaged()`

This function should be called when we first navigate to the Gallery screen, so override `initState` and call it from there:
``` dart
@override
void initState() {
  _fetchAssets();
  super.initState();
}
```
Finally, just to make sure everything works, modify the text widget so it displays the number of assets in the list:
``` dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(
      title: Text('Gallery'),
    ),
    body: Center(
      // Modify this line as follows
      child: Text('There are ${assets.length} assets'),
    )
  );
}
```
Run the app, open the gallery, and if you didn't make any mistakes, the displayed number should be greater than 0 (Unless you have no photos/videos on your phone :p), something like this:

![screenshot_1][screenshot_1]

Good job, you're halfway there, all we need to do now is display the fetched assets.

### 4- Displaying photos and videos
We're going to display a `GridView` with the thumbnails of the assets. One way of getting the thumbnail is to use the `thumbData` getter of the `AssetEntity` object. It returns a `Future<Uint8List>` representing the actual bytes of the thumbnail. So we will be using an `Image.memory()` widget to display it. Let's use all of this to make an `AssetThumbnail` widget. Copy the code below somewhere in `main.dart`:
``` dart
class AssetThumbnail extends StatelessWidget {
  const AssetThumbnail({
    Key key,
    @required this.asset,
  }) : super(key: key);

  final AssetEntity asset;

  @override
  Widget build(BuildContext context) {
    // We're using a FutureBuilder since thumbData is a future
    return FutureBuilder<Uint8List>(
      future: asset.thumbData,
      builder: (_, snapshot) {
        final bytes = snapshot.data;
        // If we have no data, display a spinner
        if (bytes == null) return CircularProgressIndicator();
        // If there's data, display it as an image
        return Image.memory(bytes, fit: BoxFit.cover);
      },
    );
  }
}
```
Now, instead of showing the number of assets, let's change the code to show a `GridView` of `AssetThumbnail` widgets. Go to `_GalleryState` class, and change the build method:
``` dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(
      title: Text('Gallery'),
    ),
    body: GridView.builder(
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        // A grid view with 3 items per row
        crossAxisCount: 3,
      ),
      itemCount: assets.length,
      itemBuilder: (_, index) {
        return AssetThumbnail(asset: assets[index]);
      },
    ),
  );
}
```
That's it, re-run the app and you should see all your photos/videos displayed on the gallery screen

# Almost done
You did it! Congrats on reaching this far, we're finally seeing some results. We're almost done, let's make the thumbnails clickable, so we can display the original asset on a new screen. Also while we're on it, let's add a Play icon on top of the thumbnail if it's a video, because right now we can't differentiate between the two types. Go to the `AssetThumbnail` widget and modify the build method as follows:
``` dart
@override
Widget build(BuildContext context) {
  // We're using a FutureBuilder since thumbData is a future
  return FutureBuilder<Uint8List>(
    future: asset.thumbData,
    builder: (_, snapshot) {
      final bytes = snapshot.data;
      // If we have no data, display a spinner
      if (bytes == null) return CircularProgressIndicator();
      // If there's data, display it as an image
      return InkWell(
        onTap: () {
          // TODO: navigate to Image/Video screen
        },
        child: Stack(
          children: [
            // Wrap the image in a Positioned.fill to fill the space
            Positioned.fill(
              child: Image.memory(bytes, fit: BoxFit.cover),
            ),
            // Display a Play icon if the asset is a video
            if (asset.type == AssetType.video)
              Center(
                child: Container(
                  color: Colors.blue,
                  child: Icon(
                    Icons.play_arrow,
                    color: Colors.white,
                  ),
                ),
              ),
          ],
        ),
      );
    },
  );
}
```
Re-run the app, and if you have any videos, you'll see a play icon on top of their thumbnails.

# Displaying the original image/video
The asset data can be retrieved as a `File` using the `file` getter of the `AssetEntity` objects.
### For images
We can simply display the original image using `Image.file()`, let's create the `ImageScreen` widget:
`NOTE: make sure to import File from dart:io and not dart:html`
``` dart
class ImageScreen extends StatelessWidget {
  const ImageScreen({
    Key key,
    @required this.imageFile,
  }) : super(key: key);

  final Future<File> imageFile;

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.black,
      alignment: Alignment.center,
      child: FutureBuilder<File>(
        future: imageFile,
        builder: (_, snapshot) {
          final file = snapshot.data;
          if (file == null) return Container();
          return Image.file(file);
        },
      ),
    );
  }
}
```
Now go to the `onTap` method of the `AssetThumbnail` class, and navigate from there to the newly created `ImageScreen`:
``` dart
...
return InkWell(
  onTap: () {
    if (asset.type == AssetType.image) {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) => ImageScreen(imageFile: asset.file),
        ),
      );
    }
    // TODO: navigate to the video screen
  },
...
```
Re-run the app, click on an image thumbnail, and you should navigate to another screen containing the full image.

### For videos
We'll be using the [video_player](https://pub.dev/packages/video_player) plugin. You can find a better tutorial for this plugin [here](https://flutter.dev/docs/cookbook/plugins/play-video) in case the following code was hard to understand. Anyway, let's create a `VideoScreen` widget:
#### Add the dependency
``` yaml
dependencies:
  video_player: ^0.11.1+2
```
After running `flutter pub get`, import the library:
``` dart
import 'package:video_player/video_player.dart';
```
#### Add the `VideoScreen` widget
``` dart
class VideoScreen extends StatefulWidget {
  const VideoScreen({
    Key key,
    @required this.videoFile,
  }) : super(key: key);

  final Future<File> videoFile;

  @override
  _VideoScreenState createState() => _VideoScreenState();
}

class _VideoScreenState extends State<VideoScreen> {
  VideoPlayerController _controller;
  bool initialized = false;

  @override
  void initState() {
    _initVideo();
    super.initState();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  _initVideo() async {
    final video = await widget.videoFile;
    _controller = VideoPlayerController.file(video)
      // Play the video again when it ends
      ..setLooping(true)
      // initialize the controller and notify UI when done
      ..initialize().then((_) => setState(() => initialized = true));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: initialized
          // If the video is initialized, display it
          ? Scaffold(
              body: Center(
                child: AspectRatio(
                  aspectRatio: _controller.value.aspectRatio,
                  // Use the VideoPlayer widget to display the video.
                  child: VideoPlayer(_controller),
                ),
              ),
              floatingActionButton: FloatingActionButton(
                onPressed: () {
                  // Wrap the play or pause in a call to `setState`. This ensures the
                  // correct icon is shown.
                  setState(() {
                    // If the video is playing, pause it.
                    if (_controller.value.isPlaying) {
                      _controller.pause();
                    } else {
                      // If the video is paused, play it.
                      _controller.play();
                    }
                  });
                },
                // Display the correct icon depending on the state of the player.
                child: Icon(
                  _controller.value.isPlaying ? Icons.pause : Icons.play_arrow,
                ),
              ),
            )
          // If the video is not yet initialized, display a spinner
          : Center(child: CircularProgressIndicator()),
    );
  }
}
```
#### Navigate to it
Go to the `onTap` method of the `AssetThumbnail` class, and modify it as follows:
``` dart
...
return InkWell(
  onTap: () {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) {
          if (asset.type == AssetType.image) {
            // If this is an image, navigate to ImageScreen
            return ImageScreen(imageFile: asset.file);
          } else {
            // if it's not, navigate to VideoScreen
            return VideoScreen(videoFile: asset.file);
          }
        },
      ),
    );
  },
...
```
Re-run the app again, now click on a video thumbnail, and you should navigate to a new screen where you can play the video.

`NOTE: After installing new plugins, quit the app completely and re-run it from cold, otherwise, you will get errors`

# That's a wrap
Congrats! We're done with this tutorial. You just built a Gallery app using Flutter. You can apply this knowledge in a lot of use-cases. For example, if you're making a chat app, you can directly display photos and videos on the chat screen, and the user will be able to send them directly without quitting the app (Below are screenshots of Whatsapp and Messenger apps).

![messenger_whatsapp_screenshots][messenger_whatsapp_screenshots]
You can find the final code in this [github repo][github_repo]. If you have any questions, just ask them in the comments and I'll try to help. Bye Bye!

![peace](https://media.giphy.com/media/Ru9sjtZ09XOEg/giphy.gif)

[image_picker]: https://pub.dev/packages/image_picker
[photo_manager]: https://pub.dev/packages/photo_manager
[final_product]: https://dev-to-uploads.s3.amazonaws.com/i/h901zszai9utfdm0zdjn.gif
[screenshot_1]: https://dev-to-uploads.s3.amazonaws.com/i/l6gcfk2aeqs2vcf03pvn.jpg
[messenger_whatsapp_screenshots]: https://dev-to-uploads.s3.amazonaws.com/i/1yzmii8moa14tn86blen.jpg
[github_repo]: https://github.com/aouahib/photo_manager_demo