import videojs from 'video.js';
import VideoOverlayElement from './VideoOverlayElement'


const VideoOverlay = function (options) {
    const settings = videojs.mergeOptions({}, options);

    // De-initialize the plugin if it already has an array of overlays.
    if (Array.isArray(this.overlays_)) {
        this.overlays_.forEach(overlay => {
            this.removeChild(overlay);
            if (this.controlBar) {
                this.controlBar.removeChild(overlay);
            }
            overlay.dispose();
        });
    }

    const overlays = settings.overlays;

    // We don't want to keep the original array of overlay options around
    // because it doesn't make sense to pass it to each Overlay component.
    delete settings.overlays;
    console.log(this);

    this.overlays_ = overlays.map(o => {
        const mergeOptions = videojs.mergeOptions(settings, o);
        const attachToControlBar = typeof mergeOptions.attachToControlBar === 'string' || mergeOptions.attachToControlBar === true;

        if (!this.controls() || !this.controlBar) {
            return this.addChild('overlay', mergeOptions);
        }

        if (attachToControlBar && mergeOptions.align.indexOf('bottom') !== -1) {
            let referenceChild = this.controlBar.children()[0];

            if (this.controlBar.getChild(mergeOptions.attachToControlBar) !== undefined) {
                referenceChild = this.controlBar.getChild(mergeOptions.attachToControlBar);
            }

            if (referenceChild) {
                const controlBarChild = this.controlBar.addChild('overlay', mergeOptions);

                this.controlBar.el().insertBefore(
                    controlBarChild.el(),
                    referenceChild.el()
                );
                return controlBarChild;
            }
        }
        const playerChild = this.addChild('VideoOverlayElement', mergeOptions);
        this.el().insertBefore(
            playerChild.el(),
            this.controlBar.el()
        );
        return playerChild;
    });
};
// videojs.registerComponent('VideoOverlayElement', VideoOverlayElement);
//
// console.log("Fucking Get Called");
// console.log(videojs.getComponent('VideoOverlayElement'));

export { VideoOverlay, VideoOverlayElement};