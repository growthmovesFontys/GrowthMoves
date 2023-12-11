import { TextureLoader, Texture } from 'three';

export class ImageLoader {
  private _imagePaths = [
    '../../../public/assets/fruit_ninja_assets/images/bananas.png',
    '../../../public/assets/fruit_ninja_assets/images/red_apple.png',
    '../../../public/assets/fruit_ninja_assets/images/pear.png',
    '../../../public/assets/fruit_ninja_assets/images/peach.png',


  ];
  private _textures: Texture[] = [];
  private _loaded: boolean = false;
  private _loader = new TextureLoader();

  constructor() {
    this.loadImages();
  }

  private loadImages() {
    this._imagePaths.forEach(path => {
      this._loader.load(path, texture => {
        this._textures.push(texture);
        if (this._textures.length === this._imagePaths.length) {
          this._loaded = true;
        }
      }, undefined, error => {
        console.error(`Error loading texture at ${path}:`, error);
      });
    });
  }

  getRandomTexture(): Texture | null {
    if (!this._loaded || this._textures.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * this._textures.length);
    return this._textures[randomIndex];
  }
}
