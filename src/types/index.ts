export interface RuneToken {
    runeId: string;
    name: string;
    symbol: string;
    decimals: number;
    totalSupply: string;
    creator: string;
    timestamp: number;
}

export interface AirdropCampaign {
    id: string;
    token: RuneToken;
    totalAmount: string;
    remainingAmount: string;
    startTime: number;
    endTime: number;
    status: 'pending' | 'active' | 'completed' | 'cancelled';
    requirements: AirdropRequirement[];
    participants: Map<string, AirdropParticipant>;
}

export interface AirdropRequirement {
    type: 'holding' | 'staking' | 'social' | 'custom';
    tokenId?: string;
    minAmount?: string;
    platform?: string;
    action?: string;
    customCheck?: string;
}

export interface AirdropParticipant {
    address: string;
    amount: string;
    status: 'pending' | 'claimed' | 'rejected';
    timestamp: number;
    requirements: Map<string, boolean>;
}

export interface CreateAirdropRequest {
    token: RuneToken;
    totalAmount: string;
    startTime: number;
    endTime: number;
    requirements: AirdropRequirement[];
}

export interface ClaimAirdropRequest {
    campaignId: string;
    address: string;
    signature?: string;
}

export interface AirdropResponse {
    success: boolean;
    message: string;
    data?: any;
}

export interface ErrorResponse {
    error: string;
    code?: number;
} 