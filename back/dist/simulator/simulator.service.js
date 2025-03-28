"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulatorService = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("../firebase/firebase.service");
const simulator_1 = require("../utils/simulator");
const error_1 = require("../utils/error");
const simulator_constants_1 = require("./simulator.constants");
const crypto_1 = require("crypto");
let SimulatorService = class SimulatorService {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
    }
    async getSimulation(auth, id) {
        try {
            console.log('Fetching simulation with ID:', id);
            const simulation = await this.firebaseService.getDocument('simulations', id);
            console.log('Found simulation:', simulation);
            if (!simulation) {
                (0, error_1.throwError)('Simulation not found', 404);
            }
            if (simulation.userId !== auth.id) {
                (0, error_1.throwError)('Unauthorized access to simulation', 403);
            }
            return {
                ...simulation,
                json: simulation.simulation
            };
        }
        catch (error) {
            console.error('Detailed error:', error);
            if (error.status === 404) {
                (0, error_1.throwError)('Simulation not found', 404);
            }
            (0, error_1.throwError)('Error fetching simulation', 500);
        }
    }
    async generateHelpsPdf(auth, id) {
        const simulation = await this.getSimulation(auth, id);
        return simulation;
    }
    async createSimulation(auth, body) {
        try {
            console.log('Auth data:', auth);
            console.log('Simulation data:', body);
            if (!auth?.id) {
                console.error('Missing auth data:', {
                    auth,
                    timestamp: new Date().toISOString()
                });
                (0, error_1.throwError)('Authentication required', 401);
            }
            const simulation = {
                id: (0, crypto_1.randomUUID)(),
                userId: auth.id,
                simulation: body.simulation,
                createdAt: new Date().toISOString(),
                json: body.simulation
            };
            console.log('Attempting to create simulation:', {
                simulationId: simulation.id,
                userId: simulation.userId,
                timestamp: simulation.createdAt
            });
            await this.firebaseService.createDocument('simulations', simulation);
            console.log('Simulation created successfully:', {
                id: simulation.id,
                userId: simulation.userId
            });
            return simulation;
        }
        catch (error) {
            console.error('Creation error details:', {
                error: {
                    message: error.message,
                    code: error.code,
                    stack: error.stack
                },
                auth: auth ? {
                    id: auth.id,
                    hasAuth: !!auth
                } : 'No auth',
                timestamp: new Date().toISOString()
            });
            (0, error_1.throwError)('Error creating simulation', 500);
        }
    }
    async getTree() {
        try {
            const revenuesTable = await this.firebaseService.getDocument('config', 'revenues');
            return simulator_constants_1.SIMULATOR_TREE.map(tree => {
                if (tree.id === 'revenue') {
                    return {
                        ...tree,
                        dependencies: (0, simulator_1.loadRevenuesTreeDependencies)(revenuesTable?.table || simulator_constants_1.TABLE_REVENUES)
                    };
                }
                return tree;
            });
        }
        catch (error) {
            console.error('Error fetching revenue table:', error);
            return simulator_constants_1.SIMULATOR_TREE;
        }
    }
};
exports.SimulatorService = SimulatorService;
exports.SimulatorService = SimulatorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], SimulatorService);
//# sourceMappingURL=simulator.service.js.map