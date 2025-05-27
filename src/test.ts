import { RuneToken, AirdropCampaign, AirdropRequirement } from './types';

// Test data
const token: RuneToken = {
    runeId: '1',
    name: 'Test Token',
    symbol: 'TEST',
    decimals: 8,
    totalSupply: '1000000',
    creator: 'test-address',
    timestamp: Date.now()
};

// Create test requirements
const requirements: AirdropRequirement[] = [
    {
        type: 'holding',
        tokenId: '2',
        minAmount: '100'
    },
    {
        type: 'social',
        platform: 'twitter',
        action: 'follow'
    }
];

// Create a test campaign
const campaign: AirdropCampaign = {
    id: `${token.runeId}-${Date.now()}`,
    token,
    totalAmount: '100000',
    remainingAmount: '100000',
    startTime: Date.now(),
    endTime: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days from now
    status: 'pending',
    requirements,
    participants: new Map()
};

// Test functions
function testCampaignCreation() {
    console.log('Testing campaign creation...');
    console.log('Campaign ID:', campaign.id);
    console.log('Token:', campaign.token.symbol);
    console.log('Total Amount:', campaign.totalAmount);
    console.log('Remaining Amount:', campaign.remainingAmount);
    console.log('Start Time:', new Date(campaign.startTime).toISOString());
    console.log('End Time:', new Date(campaign.endTime).toISOString());
    console.log('Status:', campaign.status);
    console.log('Requirements:', campaign.requirements);
}

function testRequirementCheck() {
    console.log('\nTesting requirement check...');
    const address = 'test-address';
    
    // Simulate requirement check
    const requirementsMet = new Map<string, boolean>();
    requirementsMet.set('holding', true);
    requirementsMet.set('social', true);
    
    console.log('Address:', address);
    console.log('Requirements Met:', Object.fromEntries(requirementsMet));
    console.log('All Requirements Met:', Array.from(requirementsMet.values()).every(met => met));
}

function testAirdropCalculation() {
    console.log('\nTesting airdrop calculation...');
    const totalAmount = campaign.totalAmount;
    const participants = 100;
    const amountPerParticipant = Number(totalAmount) / participants;
    
    console.log('Total Amount:', totalAmount);
    console.log('Number of Participants:', participants);
    console.log('Amount per Participant:', amountPerParticipant.toFixed(8));
}

// Run tests
console.log('Starting tests...\n');
testCampaignCreation();
testRequirementCheck();
testAirdropCalculation();
console.log('\nTests completed!'); 