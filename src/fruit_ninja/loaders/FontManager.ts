import { FontLoader, Font } from "three/examples/jsm/loaders/FontLoader";

export class FontManager {
  private _font: Font | null = null;
  private _fontLoaded: boolean = false;

  public async init(): Promise<void> {
    const loader = new FontLoader();
    try {
      const font = await loader.loadAsync(
        "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
      );
      this._font = font;
      this._fontLoaded = true;
    } catch (error) {
      console.error("Error loading font:", error);
    }
  }

  public get font(): Font | null {
    return this._fontLoaded ? this._font : null;
  }

  public get isFontLoaded(): boolean {
    return this._fontLoaded;
  }
}
