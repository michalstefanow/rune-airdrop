import express, { Request, Response } from 'express';
import * as bitcoin from 'bitcoinjs-lib';
import Decimal from 'decimal.js';
import { 
    RuneToken,
    AirdropCampaign,
    AirdropRequirement,
    AirdropParticipant,
    CreateAirdropRequest,
    ClaimAirdropRequest,
    AirdropResponse,
    ErrorResponse
} from './types';

const app = express();
const network = bitcoin.networks.testnet;

// In-memory storage (replace with database in production)
const campaigns: Map<string, AirdropCampaign> = new Map();

// Middleware
app.use(express.json());

// Helper function to generate campaign ID
function generateCampaignId(token: RuneToken, timestamp: number): string {
    return `${token.runeId}-${timestamp}`;
}

// Helper function to check if requirements are met
async function checkRequirements(
    requirements: AirdropRequirement[],
    address: string
): Promise<Map<string, boolean>> {
    const results = new Map<string, boolean>();
    
    for (const req of requirements) {
        let isMet = false;
        
        switch (req.type) {
            case 'holding':
                // TODO: Check token balance
                isMet = true;
                break;
            case 'staking':
                // TODO: Check staking status
                isMet = true;
                break;
            case 'social':
                // TODO: Check social media actions
                isMet = true;
                break;
            case 'custom':
                // TODO: Execute custom check
                isMet = true;
                break;
        }
        
        results.set(req.type, isMet);
    }
    
    return results;
}

// Helper function to calculate airdrop amount
function calculateAirdropAmount(
    totalAmount: string,
    participants: number
): string {
    return new Decimal(totalAmount).div(participants).toString();
}

// API Endpoints

// Get all airdrop campaigns
app.get('/campaigns', (req: Request, res: Response) => {
    res.json(Array.from(campaigns.values()));
});

// Get campaign by ID
app.get('/campaigns/:id', (req: Request, res: Response) => {
    const campaign = campaigns.get(req.params.id);
    if (!campaign) {
        return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json(campaign);
});

// Create new airdrop campaign
app.post('/campaigns', async (req: Request<{}, {}, CreateAirdropRequest>, res: Response) => {
    try {
        const { token, totalAmount, startTime, endTime, requirements } = req.body;
        const campaignId = generateCampaignId(token, Date.now());
        
        if (campaigns.has(campaignId)) {
            return res.status(400).json({ error: 'Campaign already exists' });
        }

        const campaign: AirdropCampaign = {
            id: campaignId,
            token,
            totalAmount,
            remainingAmount: totalAmount,
            startTime,
            endTime,
            status: 'pending',
            requirements,
            participants: new Map()
        };

        campaigns.set(campaignId, campaign);
        res.json(campaign);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});

// Start airdrop campaign
app.post('/campaigns/:id/start', (req: Request, res: Response) => {
    const campaign = campaigns.get(req.params.id);
    if (!campaign) {
        return res.status(404).json({ error: 'Campaign not found' });
    }

    if (campaign.status !== 'pending') {
        return res.status(400).json({ error: 'Campaign cannot be started' });
    }

    campaign.status = 'active';
    res.json(campaign);
});

// Claim airdrop
app.post('/campaigns/:id/claim', async (req: Request<{}, {}, ClaimAirdropRequest>, res: Response) => {
    try {
        const { address, signature } = req.body;
        const campaign = campaigns.get(req.params.id);

        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }

        if (campaign.status !== 'active') {
            return res.status(400).json({ error: 'Campaign is not active' });
        }

        if (Date.now() < campaign.startTime || Date.now() > campaign.endTime) {
            return res.status(400).json({ error: 'Campaign is not active at this time' });
        }

        // Check if address has already claimed
        if (campaign.participants.has(address)) {
            return res.status(400).json({ error: 'Address has already claimed' });
        }

        // Check requirements
        const requirementsMet = await checkRequirements(campaign.requirements, address);
        const allRequirementsMet = Array.from(requirementsMet.values()).every(met => met);

        if (!allRequirementsMet) {
            return res.status(400).json({ error: 'Requirements not met' });
        }

        // Calculate airdrop amount
        const amount = calculateAirdropAmount(
            campaign.remainingAmount,
            campaign.participants.size + 1
        );

        // Create participant record
        const participant: AirdropParticipant = {
            address,
            amount,
            status: 'pending',
            timestamp: Date.now(),
            requirements: requirementsMet
        };

        campaign.participants.set(address, participant);
        campaign.remainingAmount = new Decimal(campaign.remainingAmount)
            .sub(amount)
            .toString();

        // TODO: Implement actual token transfer
        // 1. Create transaction
        // 2. Sign transaction
        // 3. Broadcast transaction

        res.json({
            success: true,
            message: 'Airdrop claimed successfully',
            data: {
                amount,
                transactionHash: '0x...' // Replace with actual transaction hash
            }
        });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});

// Get campaign participants
app.get('/campaigns/:id/participants', (req: Request, res: Response) => {
    const campaign = campaigns.get(req.params.id);
    if (!campaign) {
        return res.status(404).json({ error: 'Campaign not found' });
    }

    res.json(Array.from(campaign.participants.values()));
});

// Start the server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Rune airdrop application running on port ${PORT}`);
}); 