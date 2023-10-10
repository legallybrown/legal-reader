const commercialLegalPositions = {
    title: "Commercial Legal Positions",
    positions: [
        {
            name: 'Payment Terms',
            description: `If the contract addresses payment terms, we require the following:
            1. Minimum 30-day payment term
            2. They must send us an invoice
            3. No Interest on late payments or amounts in dispute
            4. A minimum of 30 days notice before any services can be suspended for late payment`
        },
        {
            name: 'Autorenewal',
            description: `The contract should not have an automatic renewal provision. Any subsequent term of the contract should be effectuated by another signed agreement between the parties.`
        },
        {
		    name: 'Confidentiality',
		    description: `The contract should have a provision that ensures both parties will protect the other's confidential information. Any data that is stored in Vendor's systems should be included in the definition of "Confidential Information". The definition of "Confidential Information" should include information that is marked as confidential, or if not marked, reasonably understood to be confidential, regardless of whether it is disclosed orally, visually, or in writing.`
		},
		{
		    name: 'Publicity',
		    description: `The contract should not allow the Vendor to use the company's name, logo, or other intellectual property without the company's prior written consent.`
		},
		{
		    name: 'Indemnity',
		    description: `The company must be indemnified against third-party claims that the Vendor's services violate any third party's intellectual property of any kind. The company must be indemnified for any breaches of confidentiality by Vendor and for any breach of personal information or violation of any relevant privacy law. This indemnity must be uncapped.`
		},
		{
		    name: 'Liability Cap',
		    description: `The contract must include a cap on Liability for the company. The preferred cap is the fees paid by the company over the last 12 months.`
		},
		{
		    name: 'Subcontractors',
		    description: `The service provider must remain responsible to the company for any part of the performance of the services that is carried out by a subcontractor or other third party.`
		}
        
    ]
};

export default commercialLegalPositions;





