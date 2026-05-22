import React, { useEffect, useRef } from 'react';
import { Renderer, Camera, Transform, Geometry, Program, Mesh, Color } from 'ogl';

const vertexShader = `
    attribute vec3 position;
    attribute vec3 normal;
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform mat3 normalMatrix;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    precision highp float;
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float iTime;
    
    void main() {
        vec3 normal = normalize(vNormal);
        vec3 eye = normalize(-vPosition);
        
        // Fresnel / Rim Light Effect
        float fresnel = pow(1.0 - max(0.0, dot(normal, eye)), 3.0);
        
        // Pulsing base color
        float pulse = 0.6 + 0.4 * sin(iTime * 2.0);
        vec3 baseColor = vec3(0.11, 0.20, 0.38) * pulse;
        vec3 rimColor = vec3(0.3, 0.5, 0.8);
        
        vec3 finalColor = mix(baseColor, rimColor, fresnel);
        
        gl_FragColor = vec4(finalColor, 0.3 + fresnel * 0.7);
    }
`;

const wireframeVertexShader = `
    attribute vec3 position;
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const wireframeFragmentShader = `
    precision highp float;
    uniform float iTime;
    void main() {
        float pulse = 0.8 + 0.2 * sin(iTime * 4.0);
        gl_FragColor = vec4(0.2, 0.4, 0.7, 1.0 * pulse);
    }
`;

const AiBrainVisual = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;

        const renderer = new Renderer({ alpha: true, antialias: true });
        const gl = renderer.gl;
        container.appendChild(gl.canvas);

        const camera = new Camera(gl, { fov: 35 });
        camera.position.z = 6;

        const scene = new Transform();

        // Dodecahedron Geometry Data
        const t = (1 + Math.sqrt(5)) / 2;
        const r = 1 / t;

        const vertices = [
            [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
            [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
            [0, -r, -t], [0, r, -t], [0, -r, t], [0, r, t],
            [-r, -t, 0], [r, -t, 0], [r, t, 0], [-r, t, 0],
            [-t, 0, -r], [t, 0, -r], [t, 0, r], [-t, 0, r]
        ];

        const faces = [
            [3, 15, 14, 2, 9], [2, 14, 6, 18, 17], [6, 11, 10, 5, 18], [10, 4, 12, 13, 5],
            [12, 0, 16, 19, 4], [16, 3, 9, 8, 0], [8, 1, 17, 2, 9], [17, 1, 13, 5, 18],
            [13, 1, 8, 0, 12], [14, 15, 7, 11, 6], [15, 3, 16, 19, 7], [19, 4, 10, 11, 7]
        ];

        const positions = [];
        const normals = [];
        const wireframePositions = [];

        faces.forEach(face => {
            const center = [0, 0, 0];
            face.forEach(idx => {
                center[0] += vertices[idx][0] / 5;
                center[1] += vertices[idx][1] / 5;
                center[2] += vertices[idx][2] / 5;
            });
            const normal = normalize(center);
            for (let i = 0; i < face.length; i++) {
                const p1 = vertices[face[i]];
                const p2 = vertices[face[(i + 1) % face.length]];
                positions.push(...center, ...p1, ...p2);
                normals.push(...normal, ...normal, ...normal);
                wireframePositions.push(...p1, ...p2);
            }
        });

        function normalize(v) {
            const l = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
            return [v[0] / l, v[1] / l, v[2] / l];
        }

        const geometry = new Geometry(gl, {
            position: { size: 3, data: new Float32Array(positions) },
            normal: { size: 3, data: new Float32Array(normals) },
        });

        const program = new Program(gl, {
            vertex: vertexShader,
            fragment: fragmentShader,
            uniforms: { iTime: { value: 0 } },
            transparent: true,
            cullFace: gl.BACK,
        });

        const mesh = new Mesh(gl, { geometry, program });
        mesh.setParent(scene);

        const wireframeGeometry = new Geometry(gl, {
            position: { size: 3, data: new Float32Array(wireframePositions) },
        });
        const wireframeProgram = new Program(gl, {
            vertex: wireframeVertexShader,
            fragment: wireframeFragmentShader,
            uniforms: { iTime: { value: 0 } },
            transparent: true,
        });
        const wireframeMesh = new Mesh(gl, { mode: gl.LINES, geometry: wireframeGeometry, program: wireframeProgram });
        wireframeMesh.setParent(scene);

        function resize() {
            const { clientWidth, clientHeight } = container;
            renderer.setSize(clientWidth, clientHeight);
            camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
        }
        window.addEventListener('resize', resize);
        resize();

        let raf;
        function update(t) {
            raf = requestAnimationFrame(update);
            const time = t * 0.001;
            program.uniforms.iTime.value = time;
            wireframeProgram.uniforms.iTime.value = time;
            scene.rotation.y = time * 0.3;
            scene.rotation.x = time * 0.2;
            scene.rotation.z = Math.sin(time * 0.1) * 0.1;
            renderer.render({ scene, camera });
        }
        raf = requestAnimationFrame(update);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(raf);
            if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
            gl.getExtension('WEBGL_lose_context')?.loseContext();
        }
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
            {/* Bold Content Inside the 3D Structure */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
                <div className="text-center bg-white/80 backdrop-blur-md p-6 rounded-[2rem] border border-primary/20 shadow-[0_0_30px_rgba(29,52,97,0.12)]">
                    <div className="space-y-4">
                        <div className="flex flex-col items-center">
                            <span className="text-4xl font-black text-primary">
                                +142%
                            </span>
                            <span className="text-[10px] text-primary/70 uppercase tracking-[0.3em] font-bold">Growth Velocity</span>
                        </div>

                        <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto"></div>

                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold text-slate-900 tracking-tighter">2.5M+</span>
                            <span className="text-[10px] text-primary/70 uppercase tracking-[0.3em] font-bold">Data Points</span>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-1/4 flex items-center gap-3 px-4 py-1.5 bg-primary/5 border border-primary/20 rounded-full backdrop-blur-sm">
                    <span className="flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary/40 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span className="text-[10px] text-primary font-bold uppercase tracking-[0.2em]">AI System Operationals</span>
                </div>
            </div>

            <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
        </div>
    );
};

export default AiBrainVisual;
