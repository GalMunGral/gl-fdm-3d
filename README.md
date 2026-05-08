# GL FDM 3D

**Live demo:** https://galmungral.github.io/gl-fdm-3d/

## Rhetorical Design

### Purpose

This project extends [gl-fdm-2d](https://github.com/GalMunGral/gl-fdm-2d) to three dimensions: the 3D wave equation is solved in real time on the GPU, and the resulting volumetric field is rendered via ray marching — the same ray-based approach as [gl-raytracer](https://github.com/GalMunGral/gl-raytracer), applied to a volume rather than a surface. The combination demonstrates that both simulation and rendering of 3D physical phenomena can be performed entirely on the GPU. The ray marching renderer is the same as [visible-human-volume](https://github.com/GalMunGral/visible-human-volume), repurposed here to render simulation output rather than medical imaging data.

### Strategy

The simulation runs continuously, with each frame advancing the wave equation by one time step and immediately rendering the updated volume. The audience observes the 3D wave evolving in real time.

## Technical Challenges

### Packing 3D State into a 2D Texture

WebGL does not support rendering to a 3D texture. To apply the ping-pong framebuffer pattern from gl-fdm-2d, the 3D grid is flattened into a 2D texture by stacking z-slices along the vertical axis. The fragment shader reconstructs the three-dimensional coordinates from the fragment position using integer division and modular arithmetic.

### Arcball Camera Control

The renderer implements arcball rotation from scratch, without relying on framework support. Dragging maps two screen positions to directions on a virtual sphere; the quaternion that rotates **u** onto **d** is

```math
q = \cos\tfrac{\theta}{2} + \sin\tfrac{\theta}{2}\,\frac{\mathbf{u} \times \mathbf{d}}{\|\mathbf{u} \times \mathbf{d}\|}, \qquad \theta = \arccos(\mathbf{u} \cdot \mathbf{d})
```

where **u** and **d** are the unit directions corresponding to the pointer positions before and after the drag. This quaternion is applied to the camera's basis vectors (e₁, e₂, e₃), which are then passed directly to the ray marching shader as the view matrix.
