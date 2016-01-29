
uniform sampler2D explosionTex;
uniform float colorScale;
uniform float weight;

varying vec2 vUv;
varying float noise;



void main() {

    // noise values can be negative / we need to use its absolute values
    // our noise values might also not be in the full range between 0-1
    // add a scale (brightness) value that is controlled by a uniform variable
    float newNoise = abs(noise * weight);
    // our goal is to access a color in our texture (explosion.png)
    // therefore we need a texture (uv) coordinate (vec2) that accesses a
    // value in the texture
    //
    // a small noise value should access a dark value in the texture
    // a high noise value should return a light value

    vec2 tPos = vec2( 0, newNoise * colorScale );
    vec4 color = texture2D( explosionTex, tPos );

    gl_FragColor = vec4 (color.rgb, 1.0);

}
	