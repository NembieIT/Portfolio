import { useEffect, useRef } from 'react';

const VERTEX_SHADER = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_texCoord;

void main() {
    vec2 uv = v_texCoord;
    vec2 m = u_mouse / u_resolution;
    
    // Create a fluid, organic movement
    float noise = sin(uv.x * 3.0 + u_time * 0.5) * cos(uv.y * 3.0 - u_time * 0.3);
    noise += 0.5 * sin(uv.x * 6.0 - u_time * 0.8) * cos(uv.y * 6.0 + u_time * 0.4);
    
    // Base dark colors from Lumina Noir theme
    vec3 color1 = vec3(0.074, 0.074, 0.074); // #131313
    vec3 color2 = vec3(0.11, 0.106, 0.106); // #1c1b1b
    vec3 accent = vec3(0.741, 0.0, 1.0);     // #bd00ff (Custom Violet)
    
    // Mix based on noise and mouse position
    float dist = distance(uv, m);
    float glow = smoothstep(0.4, 0.0, dist) * 0.15;
    
    vec3 finalColor = mix(color1, color2, noise * 0.5 + 0.5);
    finalColor += accent * glow;
    
    gl_FragColor = vec4(finalColor, 1.0);
}`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Unable to create shader');

  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

/** STITCH_SHADER_START:ANIMATION_2 — interactive WebGL fluid background (logic preserved verbatim). */
export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasNode = canvasRef.current;
    if (!canvasNode) return undefined;
    const canvas: HTMLCanvasElement = canvasNode;

    // Sync the WebGL drawing-buffer size with the CSS-driven layout size.
    // This fires on initial layout and whenever the element is resized.
    function syncSize() {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    let resizeObserver: ResizeObserver | undefined;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvas);
    }
    syncSize();

    const webglContext =
      (canvas.getContext('webgl') as WebGLRenderingContext | null) ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
    if (!webglContext) return () => resizeObserver?.disconnect();
    const gl: WebGLRenderingContext = webglContext;

    const program = gl.createProgram();
    if (!program) return () => resizeObserver?.disconnect();

    gl.attachShader(program, compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
    gl.attachShader(program, compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    // u_mouse is in pixel coordinates matching u_resolution (ShaderToy convention).
    // Shaders that need normalized coords should use: u_mouse / u_resolution.
    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const onMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    let animationFrameId = 0;

    function render(t: number) {
      if (typeof ResizeObserver === 'undefined') syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    }
    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="shader-canvas-ANIMATION_2"
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
}
