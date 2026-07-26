/**
 * Vertical Workflow Animation - Central Alternating Timeline
 * Nodes in center, content alternating left and right.
 */

(function () {
    'use strict';

    // Workflow configurations with detailed content
    const workflowConfigs = {
        'workflow-viz': {
            steps: [
                {
                    icon: '🎓',
                    label: 'Student Internship',
                    desc: 'Graduate and undergraduate opportunities to gain experience in quantum-computational biology (seeking funding support).'
                },
                {
                    icon: '🔬',
                    label: 'Research Collaboration',
                    desc: 'Collaborate on multi-omics data analysis, algorithm development, and simulations.'
                },
                {
                    icon: '👨‍🏫',
                    label: 'Education Research',
                    desc: 'Conduct research on educational methodologies and support curriculum development for bioinformatics and quantum computing.'
                },
                {
                    icon: '💻',
                    label: 'Open-Source Development',
                    desc: 'Contribute to our GitHub repositories, documentation, and computational tools.'
                },
                {
                    icon: '📝',
                    label: 'Curriculum Development',
                    desc: 'Help create project-based educational materials, tutorials, and course content.'
                }
            ]
        },
        'workflow-viz-resources': {
            steps: [
                {
                    icon: '📚',
                    label: 'Publications & Research',
                    desc: 'Frameworks for modeling dynamic biological systems using graph-based quantum representations.'
                },
                {
                    icon: '⚙️',
                    label: 'Open-Source Tools',
                    desc: 'Access simulation frameworks, bioinformatics pipelines, and graph-based modeling libraries.'
                },
                {
                    icon: '📰',
                    label: 'Media & Press',
                    desc: 'Browse interviews, project spotlights, conference presentations, and blog posts.'
                },
                {
                    icon: '🎓',
                    label: 'Educational Resources',
                    desc: 'Webinars, tutorials, Jupyter notebooks, and video lectures on quantum biology.'
                }
            ]
        }
    };

    /**
     * Initialize a single workflow visualization
     */
    function initWorkflow(containerId, config) {
        const container = document.getElementById(containerId);
        if (!container) {
            return;
        }

        const steps = config.steps;

        container.innerHTML = '';
        container.classList.add('workflow-timeline');

        // Add the connecting line
        const lineDiv = document.createElement('div');
        lineDiv.className = 'workflow-line';
        container.appendChild(lineDiv);

        steps.forEach((step, index) => {
            const stepDiv = document.createElement('div');
            stepDiv.className = 'workflow-step';
            stepDiv.style.animationDelay = `${index * 0.15}s`;

            const nodeDiv = document.createElement('div');
            nodeDiv.className = 'workflow-node';
            nodeDiv.innerHTML = step.icon;
            nodeDiv.setAttribute('title', step.label);

            const contentDiv = document.createElement('div');
            contentDiv.className = 'workflow-content';

            const title = document.createElement('h5');
            title.textContent = step.label;

            const desc = document.createElement('p');
            desc.textContent = step.desc;

            contentDiv.appendChild(title);
            contentDiv.appendChild(desc);

            stepDiv.appendChild(nodeDiv);
            stepDiv.appendChild(contentDiv);

            container.appendChild(stepDiv);
        });
    }

    /**
     * Initialize all workflows
     */
    function initAllWorkflows() {
        Object.keys(workflowConfigs).forEach(containerId => {
            const config = workflowConfigs[containerId];
            initWorkflow(containerId, config);
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAllWorkflows);
    } else {
        initAllWorkflows();
    }
})();
